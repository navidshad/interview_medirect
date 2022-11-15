import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import InputSelect from "../inputs/BaseSelect.vue";

describe("InputSelect", () => {
  it("renders properly", () => {
    const props = {
      label: "sample select",
      hint: "hint text",
    };

    const wrapper = mount(InputSelect, {
      props,
    });

    expect(wrapper.find("label").text()).toContain(props.label);
    expect(wrapper.find("option").text()).toContain(props.hint);
  });

  it("check option items health", async () => {
    const props = {
      hint: "hint text",
      keyLabel: "name",
      keyValue: "key",
      options: [
        {
          name: "n1",
          key: "k1",
        },
        {
          name: "n2",
          key: "k2",
        },
      ],
    };

    const wrapper = mount(InputSelect, {
      props,
    });

    // find hint as first option before any click event
    expect(wrapper.find('[data-test="select-hint"]').exists()).eq(true);

    // Select option 1
    await wrapper.find("select").setValue("k1");
    const selected = wrapper.vm.$data.selected;
    expect(selected).equal("k1");

    // Check hint option not be exists after first selected item
    expect(wrapper.find('[data-test="select-hint"]').exists()).eq(false);

    // Check options label and value
    wrapper.findAll("option").forEach((optionEl, i) => {
      expect(props.options[i].name).equals(optionEl.text());
      expect(props.options[i].key).equals(optionEl.attributes("value"));
    });
  });
});
