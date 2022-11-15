<template>
  <ul class="inline-flex space-x-1">
    <li
      class="px-4 hover:bg-gray-200 rounded-md cursor-pointer"
      v-for="option in options"
      :key="option[keyValue]"
      :class="{ 'bg-gray-100': isSelected(option[keyValue]) }"
      @click="selected = option[keyValue]"
    >
      {{ option[keyLabel] }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    options: { type: Array, default: () => {} },
    keyLabel: { type: String, default: "label" },
    keyValue: { type: String, default: "value" },
    modelValue: {},
  },

  data() {
    return {
      selected: "",
    };
  },

  watch: {
    modelValue: {
      immediate: true,
      handler(value) {
        if (!value || value === this.hint) return;
        this.selected = value;
      },
    },

    selected() {
      this.$emit("update:modelValue", this.selected);
    },
  },

  methods: {
    isSelected(value) {
      return JSON.stringify(value) == JSON.stringify(this.selected);
    },
  },
};
</script>
