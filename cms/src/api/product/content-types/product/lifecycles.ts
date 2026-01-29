const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export default {
  beforeCreate(event: { params: { data: { name?: string; slug?: string } } }) {
    const { data } = event.params;
    if (data.name && !data.slug) {
      event.params.data.slug = slugify(data.name);
    }
  },
  beforeUpdate(event: { params: { data: { name?: string; slug?: string } } }) {
    const { data } = event.params;
    if (data.name && !data.slug) {
      event.params.data.slug = slugify(data.name);
    }
  },
};
