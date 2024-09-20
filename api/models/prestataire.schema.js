const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema(
  {
    businessname: { type: String, required: true },
    photo: [{ type: String, required: true }],
    biography: { type: String, required: true },
    service: {
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
        subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] // Référence par ID
      },
      
    description: { type: String, required: true },
    location: {
      region: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    surrounding: { type: Number },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

// Conversion _id en id
providerSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id; }
});

module.exports = mongoose.model('Providers', providerSchema);
