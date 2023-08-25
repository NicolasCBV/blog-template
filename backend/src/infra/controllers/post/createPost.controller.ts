import { NextFunction, Request, Response } from "express";
import { SetPostUseCase } from "@app/use-cases/setPost.use-case";
import { useCaseIds } from "@app/use-cases/useCaseIds";
import { inject, injectable } from "inversify";

@injectable()
export class CreatePostController {
  constructor(
    @inject(useCaseIds.post.create)
    private readonly setPostUseCase: SetPostUseCase
  ) {
    this.exec = this.exec.bind(this);
  }

  async exec(req: Request, res: Response, next: NextFunction) {
    await this.setPostUseCase.exec(req.body)
      .then((id) => {
        res.status(201).json({ id }).end();
      })
      .catch((err) => {
        next(err);
      })
  }
}
