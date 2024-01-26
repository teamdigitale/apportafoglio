<script context="module">
    const modalList = []
  </script>
  <script>
      import { booleanStore } from './booleanModalsStore'
  
    const store = booleanStore(false)
    const { isOpen, open, close } = store
    function keydown(e) {
      e.stopPropagation()
      if (e.key === 'Escape') {
        close()
      }
    }
    function transitionend(e) {
      const node = e.target
      node.focus()
    }
    function modalAction(node) {
      const returnFn = []
      // for accessibility
      /*
      if (document.body.style.overflow !== 'hidden') {
        const original = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        returnFn.push(() => {
          document.body.style.overflow = original
        })
      }*/
      node.addEventListener('keydown', keydown)
      node.addEventListener('transitionend', transitionend)
      node.focus()
      modalList.push(node)
      returnFn.push(() => {
        node.removeEventListener('keydown', keydown)
        node.removeEventListener('transitionend', transitionend)
        modalList.pop()
        // Optional chaining to guard against empty array.
        modalList[modalList.length - 1]?.focus()
      })
      return {
        destroy: () => returnFn.forEach((fn) => fn()),
      }
    }
  </script>
  <style>
    div.modale {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      padding: 5rem;
  
      display: flex;
      justify-content: right;
      gap: 30px;
      align-items: center;
      opacity: 1;
    }
    div.modale:not(:focus-within) {
      transition: opacity 0.1ms;
      opacity: 0.99;
    }
    div.backdrop {
      background-color: rgba(0, 0, 0, 0.4);
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 888888;
    }
    div.content-wrapper-m {
      z-index: 999999;
      max-width: 70vw;
      width: 70vW;
      border-radius: 0.3rem;
      background-color: white;
      overflow: hidden;
          padding: 1rem;
    }
  /*   @media (max-width: 767px) {
      div.content-wrapper {
        max-width: 100vw;
      }
    } */
    div.content {
      max-height: 50vh;
      overflow: auto;
    }

  </style>
  <slot name="trigger" {open}>
    <!-- fallback trigger to open the modal -->
    <button on:click={open}>Open</button>
  </slot>
  {#if $isOpen}
  <div class="row">
    <div class="col-12 col-lg-12">
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div class="modale" use:modalAction tabindex="-1">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="backdrop" on:click={close} />
  
      <div class="content-wrapper-m">
        <slot name="footer" {store}>
            <!-- fallback -->
            <div>
              <h1>Your Modal Footer Goes Here...</h1>
              <button on:click={close}>Close</button>
            </div>
          </slot>
        <slot name="header" {store}>
          <!-- fallback -->
          <div>
            <h1>Your Modal Heading Goes Here...</h1>
          </div>
        </slot>
  
        <div class="content">
          <slot name="content" {store} />
        </div>
  

      </div>
  
    </div>
    </div></div>
  {/if}