export class TermService {
  constructor(termModel) {
    this.termModel = termModel;
  }

  getTerms = async () => {
    try {
      const terms = await this.termModel.findAll({ attributes: ["id", "name", "startDate", "endDate"] })
      return terms;
    } catch (error) {
      console.log(error.message)
      throw new Error("Could not get terms");
    }
  }

  createTerm = async (term) => {
    try {
      const newTerm = await this.termModel.create(term);
      return newTerm;
    } catch (error) {
      throw new Error("Could not create term");
    }
  }

  updateTerm = async (id, term) => {
    try {
      const updatedTerm = await this.termModel.update(term, { where: { id } });
      return updatedTerm;
    } catch (error) {
      throw new Error("Could not update term");
    }
  }

  getTermById = async (id) => {
    try {
      const term = await this.termModel.findOne({ where: { id } });
      return term;
    } catch (error) {
      throw new Error("Could not find term");
    }
  }
}

