import express from "express";
import Lead from "../models/Lead.js";
import adminAuth from "../middleware/adminAuth.js";
const router = express.Router();

/**
 * POST /api/leads
 * Save living room form lead
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, city, whatsappUpdates, type } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      city,
      whatsappUpdates,
      type
    });

    res.status(201).json({
      success: true,
      message: "Lead submitted successfully",
      leadId: lead._id,
    });
  } catch (error) {
    console.error("Lead error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/leads
 * Get all leads (Admin)
 */
router.get("/",adminAuth, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch (error) {
    console.error("Fetch leads error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/leads/:id
 * Get single lead details
 */
router.get("/:id",adminAuth, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({
      success: true,
      lead,
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid lead ID" });
  }
});

/**
 * DELETE /api/leads/:id (optional)
 */
router.delete("/:id",adminAuth, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({
      success: true,
      message: "Lead deleted",
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid lead ID" });
  }
});

/**
 * PATCH /api/leads/:id/attended
 * Mark lead as attended / not attended
 */
router.patch("/:id/attended", adminAuth, async (req, res) => {
  try {
    const { attended } = req.body;

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { attended },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({
      success: true,
      message: "Lead status updated",
      attended: lead.attended,
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid lead ID" });
  }
});


export default router;
