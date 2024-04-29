export class TermController {
  constructor(termService) {
    this.termService = termService;
  }
  async getTerms(req, res) {
    try {
      const terms = await this.termService.getTerms();
      res.json(terms);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async getTerm(req, res) {
    try {
      const term = await this.termService.getTerm(req.params.id);
      res.json(term);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async createTerm(req, res) {
    try {
      const term = await this.termService.createTerm(req.body);
      res.json(term);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async updateTerm(req, res) {
    try {
      const term = await this.termService.updateTerm(req.params.id, req.body);
      res.json(term);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async deleteTerm(req, res) {
    try {
      const term = await this.termService.deleteTerm(req.params.id);
      res.json(term);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
