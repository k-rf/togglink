import { fn } from "@storybook/test";
import { PenIcon } from "lucide-react";

import { vars } from "~/assets/css/theme.css";
import { Box } from "~/components/ui/layout/box";
import { Stack } from "~/components/ui/layout/stack";

import { IconButton } from "./icon-button";

import type { Meta, StoryObj } from "@storybook/react";

export default {
  component: IconButton,
  args: {
    onClick: fn(),
    children: <PenIcon />,
  },
} as Meta<typeof IconButton>;

type Story = StoryObj<typeof IconButton>;

export const Size: Story = {
  render: (args) => (
    <Stack direction="column" gap={vars.spacing.xs}>
      <Box alignItems="center">
        <Box width={48}>xs:</Box>
        <IconButton {...args} size="xs" />
      </Box>
      <Box alignItems="center">
        <Box width={48}>sm:</Box>
        <IconButton {...args} size="sm" />
      </Box>
      <Box alignItems="center">
        <Box width={48}>md:</Box>
        <IconButton {...args} size="md" />
      </Box>
      <Box alignItems="center">
        <Box width={48}>lg:</Box>
        <IconButton {...args} size="lg" />
      </Box>
      <Box alignItems="center">
        <Box width={48}>xl:</Box>
        <IconButton {...args} size="xl" />
      </Box>
    </Stack>
  ),
};
