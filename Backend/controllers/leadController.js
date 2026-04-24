import Lead from "../models/Lead.js";

export const createLead = async (req, res) => {
  try {
    const { name, email, phone, city } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      city
    });

    res.status(201).json({
      message: "Lead created successfully",
      leadId: lead._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
