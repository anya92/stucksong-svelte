<script>
  import { onMount, onDestroy } from "svelte";

  export let loadMore;
  export let loading;
  export let hasMore;
  export let rootElement;

  const handleIntersection = event => {
    const [entries] = event;

    if (loading || !entries.isIntersecting || !hasMore) {
      return;
    }
    loadMore();
  };

  let observer = new IntersectionObserver(handleIntersection, {
    root: rootElement,
    rootMargin: "0px",
    threshold: 0.5
  });

  onMount(() => {
    observer.observe(document.querySelector("footer"));
  });

  onDestroy(() => {
    observer.unobserve(document.querySelector("footer"));
  });
</script>

<slot />
