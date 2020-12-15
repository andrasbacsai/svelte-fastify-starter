<script>
  import { url, isActive, goto } from "@roxi/routify/runtime";
  import { session, loggedIn, fetch } from "../store";
  import Home from "./index.svelte";
  function login() {
    const left = screen.width / 2 - 1020 / 2;
    const top = screen.height / 2 - 618 / 2;
    const newWindow = open(
      `/api/v1/login`,
      "Authenticate",
      "resizable=1, scrollbars=1, fullscreen=0, height=618, width=1020,top=" +
        top +
        ", left=" +
        left +
        ", toolbar=0, menubar=0, status=0"
    );
    const timer = setInterval(() => {
      if (newWindow.closed) {
        clearInterval(timer);
        if (
          newWindow.document.URL &&
          newWindow.document.URL.split("?")[1].split("=")[1]
        ) {
          $session.token = newWindow.document.URL.split("?")[1].split("=")[1];
          localStorage.setItem("token", $session.token);
          $goto("/admin");
        }
      }
    }, 100);
  }
  async function check() {
    if ($session.token) {
      try {
        await $fetch("/api/v1/verify", {
          headers: {
            Authorization: `Bearer ${$session.token}`,
          },
        });
      } catch (e) {
        logout();
      }
    }
  }
  function logout() {
    localStorage.removeItem("token");
    $session.token = null;
    $goto("/");
  }
  if (!$loggedIn) {
    logout();
  }
  const routes = [
    {
      name: "Admin",
      url: "/admin",
    },
    {
      name: "Environment variables",
      url: "/envs",
    },
  ];
</script>

<style>
  .active {
    @apply underline;
  }
</style>

<div id="app text-center">
  {#await check()}
    <p class="text-center">Loading...</p>
  {:then}
    {#if $loggedIn}
      <nav class="py-3 px-2 border-b space-x-4 text-center">
        {#each routes as route}
          <a
            class="hover:underline"
            class:active={$isActive(`.${route.url === '/' ? '/index' : route.url}`)}
            href={$url(route.url)}>{route.name}</a>
        {/each}
        <button class="hover:underline" on:click={logout}>Logout</button>
      </nav>
    {:else}
      <nav class="py-3 px-2 border-b space-x-4 text-center">
        <button class="hover:underline" on:click={login}>Login</button>
      </nav>
    {/if}
    <main class="py-2 max-w-7xl mx-auto text-center">
      {#if $loggedIn}
        <slot />
      {:else}
        <Home />
      {/if}
    </main>
  {/await}
</div>
