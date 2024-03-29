import { ComponentStory, ComponentMeta } from "@storybook/react";
import NetworkDropdown, { Props } from "./index.js";

export default {
    title: "Network/NetworkDropdown",
    component: NetworkDropdown,
    parameters: {
        docs: {
            description: {
                component: "Select of available networks",
            },
        },
    },
} as ComponentMeta<typeof NetworkDropdown>;

const Template: ComponentStory<typeof NetworkDropdown> = (args) => (
    <NetworkDropdown {...args} />
);
export const Main = Template.bind({});

const args: Props = {
    options: [],
};

Main.args = args;
