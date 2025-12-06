// projects-data.js
// Part 2: Data Loading (Local Storage + Remote Fetch)

// 1. 本地数据 (你的8张本地图片)
const localProjectsData = [
  {
    title: "Introverted Intuition (Ni)",
    image: "images/ni.jpg",
    alt: "Abstract galaxy representing deep insight",
    description: "Ni creates a holistic vision of the future. It synthesizes paradoxical information to see underlying patterns and predict long-term outcomes.",
    link: "types.html#ni",
    date: "Perceiving",
    keywords: "Visionary, Insight, Abstract"
  },
  {
    title: "Extraverted Intuition (Ne)",
    image: "images/ne.jpg",
    alt: "Abstract network representing possibilities",
    description: "Ne explores external possibilities and connects disparate ideas. It loves brainstorming, novelty, and asking 'what if?' to generate options.",
    link: "types.html#ne",
    date: "Perceiving",
    keywords: "Possibilities, Ideas, Exploration"
  },
  {
    title: "Introverted Sensing (Si)",
    image: "images/si.jpg",
    alt: "Vintage library representing stored memory",
    description: "Si compares the present to past experiences. It values tradition, reliability, and detailed recall of facts and sensory data.",
    link: "types.html#si",
    date: "Perceiving",
    keywords: "Memory, Routine, Stability"
  },
  {
    title: "Extraverted Sensing (Se)",
    image: "images/se.jpg",
    alt: "Surfer in action representing the present moment",
    description: "Se focuses on the immediate physical world. It thrives on action, sensory impact, and responding quickly to the environment.",
    link: "types.html#se",
    date: "Perceiving",
    keywords: "Action, Present, Sensation"
  },
  {
    title: "Introverted Thinking (Ti)",
    image: "images/ti.jpg",
    alt: "Mechanical gears representing internal logic",
    description: "Ti seeks internal logical consistency. It deconstructs ideas to understand their core principles and works independently to solve problems.",
    link: "types.html#ti",
    date: "Judging",
    keywords: "Logic, Analysis, Precision"
  },
  {
    title: "Extraverted Thinking (Te)",
    image: "images/te.jpg",
    alt: "Modern architecture representing structure",
    description: "Te organizes the external world for efficiency. It focuses on measurable results, clear rules, and executing plans effectively.",
    link: "types.html#te",
    date: "Judging",
    keywords: "Efficiency, Structure, Results"
  },
  {
    title: "Introverted Feeling (Fi)",
    image: "images/fi.jpg",
    alt: "Serene nature representing inner values",
    description: "Fi evaluates based on internal values and authenticity. It seeks emotional depth and stays true to personal beliefs regardless of social pressure.",
    link: "types.html#fi",
    date: "Judging",
    keywords: "Values, Authenticity, Individual"
  },
  {
    title: "Extraverted Feeling (Fe)",
    image: "images/fe.jpg",
    alt: "Group of friends representing harmony",
    description: "Fe seeks social harmony and connection. It tunes into the emotions of others and values cooperation, manners, and group consensus.",
    link: "types.html#fe",
    date: "Judging",
    keywords: "Harmony, Empathy, Community"
  }
];

// 2. 初始化 LocalStorage (修正版：不再暴力覆盖)
function initializeLocalStorage() {
  // 检查：如果 LocalStorage 里没有 "projectCards" 数据，才写入默认数据
  // 如果已经有了（说明你在 CRUD 页面可能改过），就不动它！
  if (!localStorage.getItem('projectCards')) {
    localStorage.setItem('projectCards', JSON.stringify(localProjectsData));
    console.log('LocalStorage empty, initialized with default data.');
  } else {
    console.log('LocalStorage has data, skipping initialization.');
  }
}

// 3. 通用显示函数
function displayProjects(projects, source) {
  const container = document.getElementById('projects-container');
  container.innerHTML = ''; 
  
  if (!projects || projects.length === 0) {
    container.innerHTML = `<div class="empty-state"><p>No projects found in ${source}.</p></div>`;
    return;
  }
  
  projects.forEach(project => {
    let card = document.createElement('project-card');
    card.setAttribute('title', project.title);
    card.setAttribute('image', project.image);
    card.setAttribute('alt', project.alt || project.title);
    card.setAttribute('description', project.description);
    card.setAttribute('link', project.link);
    // date and keywords removed as per user request
    container.appendChild(card);
  });
  
  // 弹窗提示数据来源，方便助教确认你真的Fetch了
  alert(`Loaded ${projects.length} cards from ${source}!`);
  console.log(`Loaded ${projects.length} cards from ${source}`);
}

// 4. Load Local 按钮逻辑
function loadLocalData() {
  // 先检查 localStorage 是否有数据，如果没有才初始化默认数据
  if (!localStorage.getItem('projectCards')) {
    initializeLocalStorage();
  }
  
  // 读取 localStorage 中的数据（可能是默认的8张，也可能是CRUD页面修改过的）
  const jsonString = localStorage.getItem('projectCards');
  if (!jsonString) {
    alert('No data found in Local Storage.');
    return;
  }
  
  const projects = JSON.parse(jsonString);
  displayProjects(projects, 'Local Storage');
}

// 5. Load Remote 按钮逻辑 (JSONBin Fetch - 已填好你的Key)
async function loadRemoteData() {
  const loadRemoteBtn = document.getElementById('load-remote-btn');
  loadRemoteBtn.textContent = 'Loading...';
  loadRemoteBtn.disabled = true;

  // ⬇️ 你的真实 ID 和 Key ⬇️
  const BIN_ID = '6932181043b1c97be9d86ad0'; 
  const API_KEY = '$2a$10$3V.Wzbe37dklJ0V56hawxedzy9M25CAz31AmmolWUIJGrZCeVxN60'; 

  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: 'GET',
      headers: {
        'X-Master-Key': API_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const data = await response.json();
    const projects = data.record; // JSONBin v3 数据在 record 字段里

    displayProjects(projects, 'Remote Server (JSONBin)');

  } catch (error) {
    console.error('Remote load failed:', error);
    alert('Failed to load remote data. Please check console.');
  } finally {
    loadRemoteBtn.textContent = 'Load Remote';
    loadRemoteBtn.disabled = false;
  }
}

// 6. 绑定事件
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('load-local-btn')?.addEventListener('click', loadLocalData);
  document.getElementById('load-remote-btn')?.addEventListener('click', loadRemoteData);
});