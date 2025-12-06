// crud-operations.js
// Part 3: CRUD Operations

// 1. 读取数据
function getProjects() {
  const jsonString = localStorage.getItem('projectCards');
  return jsonString ? JSON.parse(jsonString) : [];
}

// 2. 保存数据
function saveProjects(projects) {
  localStorage.setItem('projectCards', JSON.stringify(projects));
}

// 3. 刷新列表显示
function displayAllProjects() {
  const projects = getProjects();
  const listContainer = document.getElementById('projects-list');
  const updateSelect = document.getElementById('update-id');
  const deleteSelect = document.getElementById('delete-id');
  
  if (!listContainer) return;

  listContainer.innerHTML = '';
  updateSelect.innerHTML = '<option value="">Select a project to update</option>';
  deleteSelect.innerHTML = '<option value="">Select a project to delete</option>';

  if (projects.length === 0) {
    listContainer.innerHTML = '<p>No projects found.</p>';
    return;
  }

  projects.forEach((project, index) => {
    // 添加到列表展示 - 使用 project-card 自定义元素
    const card = document.createElement('project-card');
    card.setAttribute('title', project.title || 'Untitled Project');
    card.setAttribute('image', project.image || '');
    card.setAttribute('alt', project.alt || project.title || 'Project image');
    card.setAttribute('description', project.description || 'No description available');
    card.setAttribute('link', project.link || '#');
    listContainer.appendChild(card);

    // 添加到下拉菜单
    const optionText = `${index + 1}. ${project.title}`;
    updateSelect.add(new Option(optionText, index));
    deleteSelect.add(new Option(optionText, index));
  });
}

// 4. 处理 CREATE (POST)
async function handleCreate(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  
  const newProject = {
    title: formData.get('title'),
    image: formData.get('image'),
    alt: formData.get('alt'),
    description: formData.get('description'),
    link: formData.get('link')
  };

  // --- 满足作业要求：发送 HTTP POST 请求实验 ---
  console.log("Experiment: Sending POST request...");
  try {
    await fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject)
    });
    console.log("Experiment: POST request successful (Simulated)");
  } catch (err) {
    console.log("Experiment error:", err);
  }
  // -------------------------------------------

  // 实际保存到 LocalStorage
  const projects = getProjects();
  projects.push(newProject);
  saveProjects(projects);
  
  alert('Project Created Successfully!');
  form.reset();
  displayAllProjects();
}

// 5. 处理 UPDATE (PUT)
async function handleUpdate(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const index = formData.get('id');
  
  if (index === "") return;

  const updatedProject = {
    title: formData.get('title'),
    image: formData.get('image'),
    alt: formData.get('alt'),
    description: formData.get('description'),
    link: formData.get('link')
  };

  // --- 满足作业要求：发送 HTTP PUT 请求实验 ---
  console.log("Experiment: Sending PUT request...");
  try {
    await fetch('https://httpbin.org/put', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProject)
    });
    console.log("Experiment: PUT request successful (Simulated)");
  } catch (err) {
    console.log("Experiment error:", err);
  }
  // -------------------------------------------

  const projects = getProjects();
  projects[index] = updatedProject;
  saveProjects(projects);

  alert('Project Updated Successfully!');
  form.reset();
  displayAllProjects();
}

// 6. 处理 DELETE (DELETE)
async function handleDelete() {
  const select = document.getElementById('delete-id');
  const index = select.value;

  if (index === "") {
    alert("Please select a project to delete.");
    return;
  }

  if (!confirm("Are you sure you want to delete this project?")) return;

  // --- 满足作业要求：发送 HTTP DELETE 请求实验 ---
  console.log("Experiment: Sending DELETE request...");
  try {
    await fetch('https://httpbin.org/delete', {
      method: 'DELETE'
    });
    console.log("Experiment: DELETE request successful (Simulated)");
  } catch (err) {
    console.log("Experiment error:", err);
  }
  // -------------------------------------------

  const projects = getProjects();
  projects.splice(index, 1); // 删除指定项
  saveProjects(projects);

  alert('Project Deleted Successfully!');
  displayAllProjects();
}

// 7. 辅助功能：当选择更新项目时，自动填充表单
function loadProjectData() {
  const index = document.getElementById('update-id').value;
  if (index === "") return;

  const projects = getProjects();
  const p = projects[index];

  document.getElementById('update-title').value = p.title;
  document.getElementById('update-image').value = p.image;
  document.getElementById('update-alt').value = p.alt;
  document.getElementById('update-description').value = p.description;
  document.getElementById('update-link').value = p.link;
}

// 8. 绑定事件
document.addEventListener('DOMContentLoaded', () => {
  displayAllProjects();

  const createForm = document.getElementById('create-form');
  if (createForm) createForm.addEventListener('submit', handleCreate);

  const updateForm = document.getElementById('update-form');
  if (updateForm) updateForm.addEventListener('submit', handleUpdate);

  const deleteBtn = document.getElementById('delete-btn');
  if (deleteBtn) deleteBtn.addEventListener('click', handleDelete);

  const updateSelect = document.getElementById('update-id');
  if (updateSelect) updateSelect.addEventListener('change', loadProjectData);
});