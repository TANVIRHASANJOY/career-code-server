# 🚀 CareerCode Server (Backend)

This is the server-side logic for the CareerCode Job Portal. It is built using **Node.js**, **Express.js**, and **MongoDB**, and is optimized for deployment on **Vercel**.

## 🌐 Live API Base URL
- **Vercel Deployment:** [https://career-code-server-sigma-ten.vercel.app](https://career-code-server-sigma-ten.vercel.app)

## 🛠️ Tech Stack
- **Framework:** Express.js
- **Runtime:** Node.js
- **Database:** MongoDB Atlas
- **Authentication Support:** Firebase Admin (handled via client-side logic)
- **Deployment:** Vercel



## 📡 API Endpoints

### 💼 Jobs Data
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/jobs` | Fetch all available jobs from the database. |
| `GET` | `/jobs/:id` | Fetch specific details for a single job by its ID. |

### 📝 Job Applications
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/job-applications?email=user@example.com` | Fetch all applications submitted by a specific user. |
| `POST` | `/job-applications` | Submit a new job application (linked via body). |
| `DELETE` | `/job-applications/:id` | Cancel/Remove a specific job application. |

## 🏗️ Database Structure (MongoDB)
The server interacts with two main collections:
1. `jobs`: Stores job titles, descriptions, salary ranges, and requirements.
2. `job_applications`: Stores applicant data, including email and links to GitHub/LinkedIn/Resume.



## ⚙️ Local Setup

1. **Clone the server repo:**
   ```bash
   git clone [https://github.com/your-username/career-code-server.git](https://github.com/your-username/career-code-server.git)