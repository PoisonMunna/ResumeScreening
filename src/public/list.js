document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch("/applications");
      const applications = await response.json();
  
      const tableBody = document.querySelector("#applicationsTable tbody");
  
      applications.forEach(app => {
        const row = document.createElement("tr");
  
        row.innerHTML = `
          <td>${app.full_name}</td>
          <td>${app.email}</td>
          <td>${app.phone}</td>
          <td>${app.degree}</td>
          <td>${app.major}</td>
          <td>${app.gpa || "N/A"}</td>
          <td>${app.duration || "N/A"}</td>
        `;
  
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching applications:", error);
      alert("Failed to load application data.");
    }
  });
  