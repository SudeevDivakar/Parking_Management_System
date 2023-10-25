function openModal() {
    document.getElementById("modal1").classList.add("is-active");
}

function closeModal() {
    document.getElementById("modal1").classList.remove("is-active");
}

document.querySelectorAll(".modal-background, .modal-close,.modal-card-head.delete, .modal-card-foot.button").forEach(($el) => {
            const $modal = $el.closest(".modal");
            $el.addEventListener("click", () => {
            
            $modal.classList.remove("is-active");
          });
        });
         
        document.addEventListener("keydown", (event) => {
        const e = event || window.event;
            if (e.keyCode === 27) { 
             
              closeModal();
            }
         });