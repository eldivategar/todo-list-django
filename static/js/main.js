const csrftoken = Cookies.get('csrftoken');

const upd = (url) => {
  Swal.fire({
    title: "Update this task to Done ?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Updating task...",
        icon: "loading",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRFToken": csrftoken,
        },
      }).then((data) => {
        Swal.fire({
          icon: "success",
          title: "Task Updated!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
      });
    }
  });
};

const del = (url) => {
  Swal.fire({
    title: "Do you want to delete this task?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Delete",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleting task...",
        icon: "loading",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRFToken": csrftoken,
        },
      }).then((data) => {
        Swal.fire({
          icon: "success",
          title: "Task deleted!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
      });
    }
  });
};

const addTaskButton = document.getElementById("add-task-button");

addTaskButton.addEventListener("click", function () {
  Swal.fire({
    title: "Add Task",
    html: `<input type="text" id="member" class="swal2-input" placeholder="Your name">
      <input type="text" id="title" class="swal2-input" placeholder="Title">
      <div id="priority" class="swal2-radio">
        <h5>Priority</h5>
        <input type="radio" id="low" name="priority" value="Low">
        <label for="low">Low</label>
        <input type="radio" id="mid" name="priority" value="Mid">
        <label for "mid">Mid</label>
        <input type="radio" id="high" name="priority" value="High">
        <label for="high">High</label>
      </div>`,
    confirmButtonText: "Submit",
    focusConfirm: false,

    preConfirm: () => {
      const member = Swal.getPopup().querySelector("#member").value;
      const title = Swal.getPopup().querySelector("#title").value;
      const priority = Swal.getPopup().querySelector(
        "#priority input[type='radio']:checked"
      ).value;
      if (!member || !title || !priority) {
        Swal.showValidationMessage(`Please insert all data!`);
      }
      Swal.showLoading();
      return fetch("/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
          member: member,
          title: title,
          priority: priority,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Gagal mengirim permintaan POST");
          }
          return response.json();
        })
        .then((data) => {
          Swal.hideLoading();
          Swal.fire({
            icon: "success",
            title: "Task Saved!",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          }).then(() => window.location.reload());
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Terjadi kesalahan",
            text: error.message,
          });
        });
    },
  });
});

document.getElementById("all-task-button").style.display = "none";
document.getElementById("all_task_done").style.display = 'none';

document.getElementById("completed-task-button").addEventListener("click", function () {
    document.getElementById("completed-task-button").style.display = "none";
    document.getElementById("all-task-button").style.display = "block";

    document.getElementById("all_task_done").style.display = 'table-row-group';
    document.getElementById("all_task").style.display = "none";
    document.getElementById("task-header").innerText = "Completed Task";
});

document.getElementById("all-task-button").addEventListener("click", function () {
    document.getElementById("all-task-button").style.display = "none";
    document.getElementById("completed-task-button").style.display = "block";

    document.getElementById("all_task").style.display = 'table-row-group';
    document.getElementById("all_task_done").style.display = "none";
    document.getElementById("task-header").innerText = "Task List";
});
