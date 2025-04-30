import { Box } from "~/components/ui/layout/box";

import { Field } from "./field";

import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: Field,
  decorators: [
    (SC) => (
      <Box width={200}>
        <SC />
      </Box>
    ),
  ],
} as Meta<typeof Field>;

type Story = StoryObj<typeof Field>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: "Label",
  },
};
