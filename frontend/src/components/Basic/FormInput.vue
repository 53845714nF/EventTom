<script setup>
const props = defineProps({
  title: String,
  placeholder: String,
  modelValue: String,
  type: String,
  options: {
    type: Array,
    reqired: false,
  },
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

    <!--Normal Input field-->
    <input
      v-if="props.type === 'text' || props.type === 'password'"
      :value="modelValue"
      @input="updateValue"
      :type="props.type"
      :placeholder="props.placeholder"
    />

    <!--Number input field: add min attribute-->
    <input
      v-if="props.type === 'number'"
      :value="modelValue"
      @input="updateValue"
      :type="props.type"
      :placeholder="props.placeholder"
      :min="0"
    />

    <!-- Textarea if type is textarea -->
    <textarea
      v-if="props.type === 'textarea'"
      :value="modelValue"
      @input="updateValue"
      :placeholder="props.placeholder"
      rows="4"
      cols="50"
    ></textarea>

    <!--Drop down menu if options are provided-->
    <select v-if="props.type === 'select'" :value="modelValue" @change="updateValue">
      <option v-for="option in props.options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<style scoped>
input,
textarea,
select {
  width: 50%;
  padding: 10px;
  border-radius: 10px;
  border: none;
  color: var(--color-text-black);
  font-family: FunnelDisplay;
  font-size: 14px;
}

textarea {
  width: 70%;
  resize: none;
}

input::placeholder {
  color: var(--color-text-light);
  font-family: FunnelDisplay;
  font-size: 14px;
}

select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

select:focus {
  outline: none;
  box-shadow: 0 0 5px var(--color-primary);
}
</style>
