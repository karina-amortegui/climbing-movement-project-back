// Generic list implementation
async function list(req: Request, res: Response) {
  try {
    // need to add pagination later
    const { page = 1, limit = 10 } = req.query;

    const q = this._.omit(req.query, ["page", "limit"]);

    const results = await this.model
      .find(q)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .select(this.notIncludedFields.map((field) => `-${field}`).join(" "));

    const totalCount = await this.model.countDocuments(q);

    res.status(200).json({
      data: results,
      page: Number(page),
      pageSize: results.length,
      limit: Number(limit),
      total: totalCount,
    });
  } catch (error) {
    this.errorHandler(error as Error, req, res);
  }
}
