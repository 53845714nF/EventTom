<script setup>
const props = defineProps({
  title: String,
  placeholder: String,
  modelValue: String,
  type: String,
  options: {
    type: Array,
    reqired: false
  }
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
      v-if="!props.options"
      :value="modelValue"
      @input="updateValue"
      :type="props.type"
      :placeholder="props.placeholder"
    />

    <!--Drop down menu if options are provided-->
    <select v-else :value="modelValue" @change="updateValue">
      <option v-for="option in props.options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>

  </div>
</template>

<style scoped>
.form-input {
  max-width: 50%;
}

input,
select {
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
