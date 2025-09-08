🎵 Music – Micro Frontend Project

A role-based music library built with React, using micro frontend architecture.
Admins can add songs and albums, while users can like songs and view their liked list.
The project is split into a container and a remote, both deployed separately on Vercel.

🚀 Running Locally
1. Clone both repositories
git clone https://github.com/rudransh2003/music-library-container.git  # container
git clone https://github.com/rudransh2003/music-library-children.git  # remote

2. Install dependencies
cd container && npm install
cd ../remote && npm install

3. Run development servers

Start the remote first:

cd remote
npm start


Then start the container:

cd ../container
npm start


Open your browser at:

Container → http://localhost:3001

Remote → http://localhost:3002
 (or your configured port)

🌐 Deployment

Container → https://music-library-container.vercel.app/

Remote → https://music-library-children.vercel.app/

Container and Remote are deployed separately on Vercel.
Each has its own Vercel project.
The container consumes the remote module via Webpack Module Federation.

Deployment Steps

Push latest changes to main (or your chosen branch).

Deploy the remote first.

Deploy the container, providing the remote's entry URL as an environment variable in the container’s Vercel deployment.

🔑 Demo Credentials

Admin

Username: admin

Password: admin123

User

Username: user

Password: user123

🛠 How It Works
Micro Frontend Architecture

The container hosts the shell app (navigation, layout, auth context).

The remote exposes features (songs, albums, forms, etc.).

Both apps are built and deployed independently, but at runtime the container dynamically loads the remote’s code using Module Federation.

This allows independent scaling, deployment, and updates.

Role-Based Authentication

JWT tokens are verified in the container (verifyToken utility).

The user role (admin or user) is extracted from the token.

Admin role:

Can add songs and albums

Can delete items

User role:

Can like songs and view them under liked songs in the side nav

The UI adapts based on role:

Admins see “Add Song” / “Create Album” buttons

Users see heart icons for liking songs

✨ Features

🎶 Default songs seeded on first run

❤️ Like/unlike songs (persisted in localStorage)

🗑 Admin-only delete with confirmation

📀 Albums with optional uploaded or URL-based covers

🔍 Search across songs, albums, artists, and titles

📱 Responsive layout (SideNav, Header, Sections)

⚡ Tech Stack

React + Webpack

Module Federation

Vercel (deployment)

TailwindCSS (UI)

Sonner (toast notifications)
