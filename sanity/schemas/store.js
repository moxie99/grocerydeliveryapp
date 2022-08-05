export default {
  name: "store",
  title: "Store",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Store Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "shortDescription",
      type: "string",
      title: "Short Description",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "image",
      type: "image",
      title: "Image of the Store",
      hotspot: true,
    },
    // {
    //   name: "genre",
    //   title: "Genre",
    //   type: "string",
    // },
    {
      name: "lat",
      type: "number",
      title: "latitude of the Store",
    },
    {
      name: "long",
      type: "number",
      title: "longitude of the Store",
    },
    {
      name: "address",
      type: "string",
      title: "Store Address",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "rating",
      type: "number",
      title: "Enter a Rating from (1-5 Stars)",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(5)
          .error("Please enter a Value between 1and 5"),
    },
    {
      name: "type",
      title: "Category",
      validation: (Rule) => Rule.required(),
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "groceries",
      type: "array",
      title: "Groceries",
      of: [{ type: "reference", to: [{ type: "grocery" }] }],
    },
  ],
};
