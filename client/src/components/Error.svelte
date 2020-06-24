<script>
  import { onMount, onDestroy } from "svelte";
  import { fade, slide } from "svelte/transition";

  onMount(() => {
    console.log("error component");
    (document.querySelectorAll(".notification .delete") || []).forEach(
      deleteBtn => {
        const notification = deleteBtn.parentNode;

        deleteBtn.addEventListener("click", () => {
          notification.parentNode.removeChild(notification);
        });
      }
    );
  });
</script>

<style>
  .notification {
    background-color: var(--error-color);
    color: #fff;
    padding: 1.25rem 2.5rem 1.25rem 1.5rem;
    border-radius: 10px;
    font-weight: 300;
    position: relative;
    z-index: 20;
  }

  button.delete {
    background: transparent;
    color: #fff;
    border: none;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
</style>

<div style="margin: 0 10px;">
  <div class="notification" in:fade={{ duration: 500 }}>
    <button class="delete">
      <i class="fas fa-times" />
    </button>
    Sorry, an error has occurred. Try again.
  </div>
</div>
