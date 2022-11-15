import { describe, expect, it } from "vitest";

import { mount, config } from "@vue/test-utils";

import PairsComponent from "../inputs/PairsSelect.vue";
import InputSelect from "../inputs/BaseSelect.vue";

config.global.components = {
  InputSelect,
};

describe("InputPairs", () => {
  it("Update shoud be triggered when there is only one selected asset", async () => {
    let props = {
      assets: [
        { code: "c1", labe: "l1" },
        { code: "c2", labe: "l2" },
      ],
    };

    const wrapper = mount(PairsComponent, {
      props,
    });

    let [baseWrapper, quoteWrapper] = wrapper.findAllComponents(InputSelect);

    await baseWrapper.find("select").setValue("c1");
    let emitted = wrapper.emitted();

    // Check emitted after first asset selection
    expect(emitted).toHaveProperty("update:modelValue");
  });

  it("Second selector should not include first selector selected asset", async () => {
    let props = {
      assets: [
        { code: "c1", labe: "l1" },
        { code: "c2", labe: "l2" },
      ],
    };

    const wrapper = mount(PairsComponent, {
      props,
    });

    let [baseWrapper] = wrapper.findAllComponents(InputSelect);

    // Both selector should contain all assets
    {
      const baseAssets = JSON.stringify(wrapper.vm.baseList);
      const quoteAssets = JSON.stringify(wrapper.vm.quoteList);

      expect(baseAssets).toBe(quoteAssets);
    }

    // Second selector should not include first selector selected asset
    {
      await baseWrapper.find("select").setValue("c1");

      const baseAssets = JSON.stringify(wrapper.vm.baseList);
      const quoteAssets = JSON.stringify(wrapper.vm.quoteList);

      expect(baseAssets).not.toBe(quoteAssets);
    }
  });
});
