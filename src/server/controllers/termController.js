import { validationService } from "../services/index.js";
import { termSchema } from "../validationSchemas/termSchema.js";
export class TermController {
  constructor(TermService) {
    this.termService = TermService
  }
  getTerms = async (req, res) => {
    try {
      const terms = await this.termService.getTerms();
      res.json({ terms });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  }

  getTermById = async (req, res) => {
    try {
      const term = await this.termService.getTermById(req.params.id);
      res.json(term);
    } catch (error) {
      res.status(500).json({ err: error.message })
    }
  }

  createTerm = async (req, res) => {
    try {
      const validTerm = await validationService.validateData(req.body, termSchema)
      const term = await this.termService.createTerm(validTerm);
      res.json({ term, msg: 'Term created successfully' })
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({ err: error.message });
      } else {
        res.status(500).json({ err: error.message })
      }
    }
  }

  updateTerm = async (req, res) => {
    try {
      const validTerm = await validationService.validateData(req.body, termSchema)
      const term = await this.termService.updateTerm(req.params.id, validTerm);
      res.json({ term, msg: 'Term updated successfully' })
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({ err: error.message });
      } else {
        res.status(500).json({ err: error.message })
      }
    }
  }

  deleteTerm = async (req, res) => {
    try {
      const term = await this.termService.deleteTerm(req.params.id);
      res.json(term);
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  }
}
