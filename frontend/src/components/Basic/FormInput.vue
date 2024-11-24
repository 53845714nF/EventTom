<script setup>
const props = defineProps({
  title: String,
  placeholder: String,
  modelValue: String,
  type: String,
});

// if the v-model is changed, the child component will emit an event to update the parent's modelValue
const emit = defineEmits(["update:modelValue"]);
const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <div class="form-input">
    <p class="p-large form-heading-margin">{{ props.title }}</p>
    <input
      :value="modelValue"
      @input="updateValue"
      :type="props.type"
      :placeholder="props.placeholder"
    />
  </div>
</template>

<style scoped>
.form-input {
  max-width: 50%;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: none;
  color: var(--color-text-black);
  font-family: FunnelDisplay;
  font-size: 14px;
}

input::placeholder {
  color: var(--color-text-light);
  font-family: FunnelDisplay;
  font-size: 14px;
}
</style>
