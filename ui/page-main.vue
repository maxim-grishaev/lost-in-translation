<template>
  <img src="/goose.png" class="goose" />
  <p>Go <NuxtLink to="./keys">Check Keys</NuxtLink>.</p>

  <details>
    <summary>The task</summary>
    <h1>Hello there, future goose!</h1>
    <p>
      You are asked to create a overview of all translation keys in Altura. In
      this view you must be able to filter on <code>key</code>, Translation
      values in different locales and the <code>updatedAt</code> date.
    </p>
    <h3>Requirements</h3>
    <ul>
      <li>
        I can see a list of all translation keys
        <ul>
          <li>
            I can see the key, translation value and the last updated date
          </li>
          <li>
            When hovering over a row, I see a tooltip with the full translation
            value for each locale.
          </li>
        </ul>
      </li>
      <li>I can filter on keys using a search input</li>
      <li>I can filter on translation keys using a date range</li>
      <li>
        I can see on which page I am and how many pages there are
        <ul>
          <li>I am able to change the page</li>
          <li>I am able to change the page size</li>
        </ul>
      </li>
      <li>When no keys are found, I see a empty state</li>
    </ul>
    <p>The keys are hosted on our directus instance, you can it here:</p>
    <p>
      <code>https://directus.altura.io/items/translationKeys</code>
    </p>
    <p>
      We already took the liberty to write typescript types for you. You can
      find them in the <code>types.d.ts</code> file of this project.
    </p>
    <p>
      Documentation about filtering in the directus api can be found
      <a
        href="https://directus.io/docs/guides/connect/filter-rules"
        target="_blank"
      >
        here.
      </a>
      One note to add is that you are allowed to use the directus sdk, but bonus
      points if you don't.
    </p>
  </details>
</template>

<style scoped>
.goose {
  width: 10rem;
  justify-self: center;
}
</style>
