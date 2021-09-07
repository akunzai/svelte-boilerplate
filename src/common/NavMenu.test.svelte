<script lang="ts">
import { Router } from "svelte-navigator";
import NavMenu from "./NavMenu.svelte";

export let title: string;
</script>

<Router>
    <NavMenu {title}/>
</Router>