import CollectionGallery from "./CollectionGallery";
import React from "react";
import tokens from "./tokens.json";

export default {
  title: "CollectionGallery",
  component: CollectionGallery,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <CollectionGallery {...args} />;

export const Tokens = Template.bind({});
Tokens.args = {
  tokens,
};

export const Empty = Template.bind({});
