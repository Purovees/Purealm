
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Purealm</title>

  <!-- Firebase SDK -->
  <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js"></script>

  <!-- PicoCSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css">

  <style>
    body {
      background-color: #ccc;
      margin: 0;
      color: #0a0a1a;
      font-family: sans-serif;
    }

    .layout {
      display: flex;
    }

    nav {
      width: 180px;
      background-color: #aaa;
      padding: 1rem;
      height: 100vh;
      position: fixed;
    }

    nav ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    nav ul li a {
      display: block;
      padding: 0.5rem;
      background-color: #888;
      border-radius: 8px;
      color: white;
      text-align: center;
      text-decoration: none;
    }

    nav ul li a:hover {
      background-color: #777;
    }

    .site-header,
    .dandy-header {
      padding: 1rem;
      text-align: center;
      border-radius: 12px;
      max-width: 600px;
      margin: 1rem auto 1rem 220px;
    }

    .site-header {
      background-color: #7851a9;
      color: #0a0a1a;
    }

    .dandy-header {
      background-color: lightgreen;
      color: darkgreen;
    }

    .rainbow-text span {
      font-weight: bold;
      font-family: sans-serif;
    }

    main {
      margin-left: 200px;
      padding: 2rem;
      width: calc(100% - 200px);
    }

    .post,
    .activity-post {
      border: 1px solid #ccc;
      padding: 1rem;
      margin-bottom: 1rem;
      background-color: #000;
      color: #0a0a1a;
    }

    .timestamp {
      font-size: 0.8rem;
      color: #0a0a1a;
    }

    .comment {
      border: 1px solid #bbb;
      padding: 0.5rem;
      background-color: #f0f0f0;
      margin-bottom: 0.5rem;
      color: #0a0a1a;
    }

    .input-container {
      display: flex;
      gap: 0.5rem;
      padding: 1rem;
      margin-left: 200px;
    }
  </style>
</head>

<body>
  <div class="input-container">
    <input type="text" id="msgInput" placeholder="Say something...">
    <button onclick="sendMessage()">Send</button>
  </div>

  <div class="layout">
    <nav>
      <ul>
        <li><a href="#" onclick="showPage('home')">Front Page</a></li>
        <li><a href="#" onclick="showPage('write')">Admin Panel</a></li>
        <li><a href="#" onclick="showPage('comments')">Comment Page</a></li>
        <li><a href="#" onclick="showPage('activity')">Activity Page</a></li>
        <li><a href="#" onclick="showPage('dandy')">Dandy's World</a></li>
      </ul>
    </nav>

    <div style="flex: 1;">
      <div id="mainHeader" class="site-header">
        <h1>Purealm</h1>
        <p>I think therefore I exist</p>
      </div>

      <main>
        <!-- Sections injected by JavaScript -->
      </main>
    </div>
  </div>

  <script>
    const firebaseConfig = {
      apiKey: "AIzaSyDSj1x-BGJFu1dWZQD9n7y18cBciJqDRNBU",
      authDomain: "puralm.firebaseapp.com",
      databaseURL: "https://puralm.firebaseio.com",
      projectId: "puralm",
      storageBucket: "puralm.appspot.com",
      messagingSenderId: "376497991610",
      appId: "1:376497991610:web:3f41bd42334021267783",
      measurementId: "G-54F72KVL87"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    function sendMessage() {
      const text = document.getElementById("msgInput").value.trim();
      if (!text) return;
      db.ref("messages").push().set({ message: text, timestamp: Date.now() });
      document.getElementById("msgInput").value = "";
    }

    function showPage(id) {
      document.querySelectorAll('main > section').forEach(sec => sec.style.display = 'none');
      document.getElementById(id).style.display = 'block';

      const header = document.getElementById('mainHeader');
      if (id === 'dandy') {
        header.className = 'dandy-header';
        header.innerHTML = `<h1 class="rainbow-text">${'Dandy\'s World'.split('').map((c, i) => `<span style='color:${['red','blue','orange','purple','green','yellow'][i%6]}'>${c}</span>`).join('')}</h1><p style="font-family: serif;">Welcome to the Gardenview Educational Center!</p>`;
      } else {
        header.className = 'site-header';
        header.innerHTML = '<h1>Purealm</h1><p>I think therefore I exist</p>';
      }
    }

    function checkAdminPassword() {
      const input = document.getElementById('adminPassword').value;
      if (input === 'vivalasvegan') {
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
      } else {
        alert('Incorrect password.');
      }
    }
  </script>

  <!-- Other scripts like createPost, render functions, form handling, etc. go here -->
</body>

</html>
