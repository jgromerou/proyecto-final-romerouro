<template>
  <v-card height="50">
    <v-footer absolute class="font-weight-medium" color="black">
      <v-col class="text-center" cols="12" style="color: white">
        {{ new Date().getFullYear() }} —
        <strong>CoderHouse</strong>
      </v-col>
    </v-footer>
  </v-card>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style></style>
