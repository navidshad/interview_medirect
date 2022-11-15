<template>
  <div>
    <label
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
    >
      {{ label }}
    </label>

    <select
      v-model="selected"
      class="
        w-full
        bg-gray-50
        border border-gray-300
        text-gray-900 text-sm
        rounded-lg
        outline-none
        focus:ring-blue-500 focus:border-blue-500
        block
        p-2.5
        dark:bg-gray-700
        dark:border-gray-600
        dark:placeholder-gray-400
        dark:text-white
        dark:focus:ring-blue-500
        dark:focus:border-blue-500
      "
    >
      <option data-test="select-hint" selected value="hint" v-if="notSelected">
        {{ hint }}
      </option>
      <option
        v-for="option in options"
        :key="option[keyValue]"
        :value="option[keyValue]"
        :selected="isSelected(option[keyValue])"
      >
        {{ option[keyLabel] }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, default: "" },
    hint: { type: String, default: "Select one item" },
    options: { type: Array, default: () => {} },
    keyLabel: { type: String, default: "label" },
    keyValue: { type: String, default: "value" },
    modelValue: {},
  },

  computed: {
    notSelected() {
      return this.selected === "hint" || this.selected == "";
    },
  },

  data() {
    return {
      selected: "hint",
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
