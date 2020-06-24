<script>
  import Logo from "../assets/Headphones.svg";
</script>

<style type="text/scss">
  .login-container {
    height: calc(100vh - 40px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fef5fc;
  }

  .logo {
    width: 160px;
    height: 160px;
    // background-color: var(--primary-color-light);
    // border: 1px solid var(--primary-color-light);
    border-radius: 50%;
    margin: 20px auto;
    // border: 1px solid var(--primary-color-light);
    // box-shadow: var(--primary-color-light) 0 0.5em 1em 0;

    img {
      height: 100%;
      // object-fit: cover;
      margin-left: -65px;
      margin-top: 20px;
    }
  }

  h1 {
    margin-bottom: 120px;
    color: var(--primary-color);
    text-align: center;
  }

  a {
    font-size: 1.2rem;
    text-decoration: none;
    background: var(--primary-color);
    border-radius: 10px;
    padding: 10px 20px;
    color: #fff !important;

    &:focus {
      outline: none;
    }

    i {
      margin-right: 8px;
    }
  }
</style>

<div class="login-container">
  <div>
    <div class="logo">
      <img src={Logo} alt="headphones" />
    </div>

    <h1>StuckSong</h1>

    <div>
      <a href="/auth/spotify" role="button">
        <i class="fab fa-spotify" />
        <span>Login with Spotify</span>
      </a>
    </div>
  </div>
</div>
