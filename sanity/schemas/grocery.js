export default {
  name: "grocery",
  title: "Grocery",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name of Grocery",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "shortDescription",
      title: "Short Description",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "price",
      type: "number",
      title: "Price of the Grocery in Dollars",
    },
    {
      name: "image",
      type: "image",
      title: "Image of the grocery",
    },
  ],
};
