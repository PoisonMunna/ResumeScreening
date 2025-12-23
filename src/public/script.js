document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("jobForm");
  const responseMessage = document.getElementById("response");

  // Utility: Show/Hide "Other" input field logic
  const setupOtherField = (selectId, containerId, inputId) => {
    const select = document.getElementById(selectId);
    const container = document.getElementById(containerId);

    select.addEventListener("change", () => {
      if (select.value === "Other") {
        container.classList.remove("hidden");
      } else {
        container.classList.add("hidden");
        const input = document.getElementById(inputId);
        if (input) input.value = "";
      }
    });
  };

  // Setup all "Other" select inputs
  setupOtherField("degree", "degree_other_container", "other_degree_text");
  setupOtherField("major", "major_other_container", "other_major_text");
  setupOtherField("programming_languages", "programming_languages_other_container", "programming_languages_other");
  setupOtherField("frameworks", "frameworks_other_container", "frameworks_other");
  setupOtherField("tools", "tools_other_container", "tools_other");
  setupOtherField("databases", "databases_other_container", "databases_other");

  // Form submission
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitButton = form.querySelector(".submit-button");
    submitButton.disabled = true;
    responseMessage.innerText = "Submitting...";

    const formData = {
      full_name: form.full_name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      address: form.address.value.trim(),
      degree: form.degree.value === "Other" ? form.other_degree_text.value.trim() : form.degree.value,
      major: form.major.value === "Other" ? form.other_major_text.value.trim() : form.major.value,
      university: form.university.value.trim(),
      grad_year: form.grad_year.value,
      gpa: form.gpa.value,
      company: form.company.value.trim(),
      job_title: form.job_title.value.trim(),
      duration: form.duration.value,
      responsibilities: form.responsibilities.value.trim(),
      programming_languages: form.programming_languages.value === "Other" ? form.programming_languages_other.value.trim() : form.programming_languages.value,
      frameworks: form.frameworks.value === "Other" ? form.frameworks_other.value.trim() : form.frameworks.value,
      tools: form.tools.value === "Other" ? form.tools_other.value.trim() : form.tools.value,
      databases: form.databases.value === "Other" ? form.databases_other.value.trim() : form.databases.value
    };

    try {
      const res = await fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      responseMessage.innerText = result.message || "Application submitted successfully!";
      form.reset();
      document.querySelectorAll(".hidden").forEach(el => el.classList.add("hidden"));
    } catch (err) {
      console.error(err);
      responseMessage.innerText = "Something went wrong while submitting the form.";
    } finally {
      submitButton.disabled = false;
    }
  });
});
