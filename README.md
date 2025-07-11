<h1>PawTrack</h1>

<p>
  PawTrack is a full-stack, mobile-first web application designed to help pet owners track and manage all aspects of their pets’ health, activities, and care. The app allows users to register, add pets, track weight, manage food and medication, record activities, log vaccinations, and store emergency contacts, all in one intuitive dashboard.
</p>

<h2>Table of Contents</h2>
<ul>
  <li><a href="#description">Description</a></li>
  <li><a href="#mvp-features">MVP Features</a></li>
  <li><a href="#backlog">Backlog / Future Features</a></li>
  <li><a href="#data-structure">Data Structure</a></li>
  <li><a href="#state-management">State Management</a></li>
  <li><a href="#task-list">Task List</a></li>
  <li><a href="#scripts">Scripts</a></li>
  <li><a href="#links">Links</a></li>
</ul>

<h2 id="description">Description</h2>
<p>
  <strong>PawTrack</strong> enables pet owners to keep all essential pet information organized and accessible. Users can securely log in, add or edit pet data, and visualize important health and care information through a simple, mobile-friendly interface.
</p>

<h2 id="mvp-features">MVP Features</h2>
<ul>
  <li>User authentication (sign up, log in, log out) with hashed passwords</li>
  <li>Pet dashboard: overview of all tracked data per pet</li>
  <li>Add/edit/delete pets (with photo upload)</li>
  <li>Weight tracking: log and view weight history per pet</li>
  <li>Food management: track food brand, portion size, allergies</li>
  <li>Medication management: add, edit, and remove medications</li>
  <li>Vaccination records: log, edit, and delete vaccinations</li>
  <li>Activity log: add daily activities (walks, play, etc.)</li>
  <li>Emergency contacts: store vet, owner, pet-sitter, and more</li>
  <li>Mobile-first responsive design (Material UI)</li>
  <li>Centralized error handling and backend validation</li>
</ul>

<h2 id="backlog">Backlog / Future Features</h2>
<ul>
  <li>Push notifications (medication, vaccination reminders)</li>
  <li>Multi-user support (family members sharing pets)</li>
  <li>Customizable activity types</li>
  <li>Advanced statistics &amp; analytics</li>
  <li>Dark mode</li>
  <li>Multi-language support</li>
</ul>

<h2 id="data-structure">Data Structure</h2>
<p><strong>User Model</strong></p>
<pre>
<code>{
  _id,
  username,
  email,
  passwordHash,
  pets: [petId]
}
</code>
</pre>
<p><strong>Pet Model</strong></p>
<pre>
<code>{
  _id,
  name,
  species,
  breed,
  avatarUrl,
  owner: userId,
  weight: [weightId],
  food: [foodId],
  medications: [medicationId],
  vaccinations: [vaccinationId],
  activities: [activityId],
  contacts: [contactId]
}
</code>
</pre>
<p>
  <em>Other models (Weight, Food, Medication, etc.) each have their own schema with references to the pet and appropriate fields.</em>
</p>

<h2 id="state-management">State Management</h2>
<p>
  All main app states are managed using React’s <code>useState</code> and <code>useEffect</code> hooks, lifted up to context providers for authentication and pet selection.
</p>
<p><strong>Main States:</strong></p>
<ul>
  <li>Authenticated user</li>
  <li>Selected pet</li>
  <li>Pet data (weight, food, medications, etc.)</li>
  <li>UI state (dialogs open/close, form edit mode, loading/error states)</li>
</ul>
<p><strong>State Transitions:</strong></p>
<ul>
  <li>On log in: fetch user &amp; pet data</li>
  <li>On pet creation: add to user, update dashboard</li>
  <li>On CRUD actions: optimistic UI update, fetch latest data</li>
  <li>On log out: reset all states</li>
</ul>

<h2 id="task-list">Task List</h2>
<ul>
  <li>Set up backend (Express, MongoDB, Mongoose)</li>
  <li>Set up frontend (React, Material UI)</li>
  <li>Authentication (JWT)</li>
  <li>Implement CRUD for all models</li>
  <li>Pet dashboard &amp; navigation</li>
  <li>Deployment (Render for backend, Netlify for frontend)</li>
  <li>Error handling</li>
  <li>Documentation &amp; slides</li>
</ul>

<h2 id="scripts">Scripts</h2>
<ul>
  <li><strong>npm start</strong>: Runs the app in development mode at <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>.</li>
  <li><strong>npm test</strong>: Launches the test runner.</li>
  <li><strong>npm run build</strong>: Builds the app for production to the <code>build</code> folder.</li>
  <li>More info: <a href="https://facebook.github.io/create-react-app/docs/getting-started" target="_blank">Create React App documentation</a></li>
</ul>

<h2 id="links">Links</h2>
<ul>
  <li><strong>Frontend Repo:</strong> <a href="https://github.com/yourusername/pawtrack-frontend" target="_blank">github.com/yourusername/pawtrack-frontend</a></li>
  <li><strong>Backend Repo:</strong> <a href="https://github.com/yourusername/pawtrack-backend" target="_blank">github.com/yourusername/pawtrack-backend</a></li>
  <li><strong>Live App:</strong> <a href="https://pawtrack.netlify.app" target="_blank">pawtrack.netlify.app</a></li>
  <li><strong>Slides:</strong> <a href="https://docs.google.com/presentation/d/..." target="_blank">Google Slides Link</a></li>
  <li><strong>Trello:</strong> <a href="[https://docs.google.com/presentation/d/...](https://trello.com/invite/b/684dbd1b7b6729ce52eed4cd/ATTId945596664ba07b100d2b6a7350aa4bcA46DE929/pawtrack)" target="_blank">Trello board Link</a></li>
</ul>
<p>
  <strong>Avatar Icon:</strong> Pet avatar illustrations by <a href="https://www.flaticon.com/" target="_blank">Freepik - Flaticon</a>.
</p>

<h2 id="deployment">Deployment</h2>
<p>
  Both frontend and backend are deployed and accessible online.<br>
  <strong>Frontend:</strong> Netlify<br>
  <strong>Backend:</strong> Render
</p>

<h2 id="license">License</h2>
<p>
  This project is for educational purposes as part of the Ironhack Fullstack Web Development Bootcamp.
</p>
