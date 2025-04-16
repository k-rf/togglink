import { Box } from "~/components/ui/layout/box";

import { Field } from "./field";

import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: Field,
} as Meta<typeof Field>;

type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: () => (
    <Box width={200}>
      <Field />
    </Box>
  ),
};
