<script>
  import { fade } from "svelte/transition";

  export let position = 1;
</script>

<style type="text/scss">
  .card__cover {
    width: 100%;
    position: relative;

    &:after {
      content: "";
      display: block;
      padding-bottom: 100%;
    }

    :global(img) {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
      z-index: 2;
      box-shadow: var(--primary-color-light-2) 0 0.5em 1em 0;
    }
  }

  .card__description {
    display: grid;
    grid-template-columns: 20px auto 30px;
    grid-gap: 10px;
    padding: 40px 15px 20px 15px;
    margin-top: -20px;
    font-size: 1.1rem;
    border-radius: 10px;
    background: #fff;
    box-shadow: var(--primary-color-light) 0 0.5em 1em 0;
    line-height: 1rem;

    &__position {
      font-weight: 900;
      text-align: right;
    }

    :global(&__title) {
      margin-bottom: 10px;
      font-weight: 900;
    }

    :global(&__subtitle) {
      font-size: 0.9rem;
      margin-bottom: 4px;
    }

    :global(&__text) {
      font-size: 0.8rem;
      font-weight: 300;
    }

    &__link {
      display: flex;
      align-items: center;
      font-size: 1.8rem;
      :global(a) {
        color: var(--primary-color);
      }
    }
  }
  @media all and (min-width: 600px) {
    .card {
      display: grid;
      grid-template-columns: 80px auto;
    }

    .card__cover {
      width: 80px;
      height: 80px;
    }

    .card__description {
      margin-top: 15px;
      margin-left: -55px;
      padding: 20px 15px 20px 65px;
    }
  }
</style>

<div class="card" in:fade={{ duration: 500 }}>
  <div class="card__cover">
    <slot name="image" />
  </div>

  <div class="card__description">
    <div class="card__description__position">{position}</div>
    <div>
      <div class="card__description__title">
        <slot name="title" />
      </div>

      <div class="card__description__subtitle">
        <slot name="subtitle" />
      </div>

      <div class="card__description__text">
        <slot name="text" />
      </div>
    </div>

    <div class="card__description__link">
      <slot name="link" />
    </div>
  </div>
</div>
