import Swal from "sweetalert2";

const toast = ({ icon, title }) => {
  Swal.fire({
    toast: true,
    icon: icon,
    title: title,
    animation: false,
    position: "bottom",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
};

export { toast };
