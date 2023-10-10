import { Repository } from "typeorm";
import { Votes } from "../entities/votes";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { createVoteSchema } from "../utils/validator/voters";

export default new (class VoteService {
  private readonly VoteRepository: Repository<Votes> =
    AppDataSource.getRepository(Votes);

  async findVotes(req: Request, res: Response): Promise<Response> {
    try {
      const votes = await this.VoteRepository.find({
        relations: {
          user: true,
          paslon: true,
        },
      });
      if (votes.length <= 0) {
        return res.status(404).json({
          code: 404,
          Message: "Votes not found!",
        });
      }
      return res.status(200).json({
        code: 200,
        data: votes,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        Error: "Error while fetching votes data!",
      });
    }
  }

  async getVote(req: Request, res: Response): Promise<Response> {
    try {
      const voteId: number = parseInt(req.params.voteId);
      const vote = await this.VoteRepository.findOne({
        relations: {
          user: true,
          paslon: true,
        },
        where: {
          id: voteId,
        },
      });
      if (!vote) {
        return res.status(404).json({
          code: 404,
          Message: "vote not found!",
        });
      }

      return res.status(200).json({
        code: 200,
        data: vote,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        Error: "Error while fetching vote data",
      });
    }
  }

  async createVote(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const { error } = createVoteSchema.validate(data);
      if (error)
        return res.status(400).json({
          code: 400,
          Error: error,
        });

      const obj = this.VoteRepository.create({
        voter_name: data.voter_name,
        paslon: data.paslonId,
        user: data.userId,
      });

      await this.VoteRepository.save(obj);
      return res.status(200).json({
        code: 200,
        data: obj,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        Error: "Error while inserting vote data",
      });
    }
  }

  async DeleteVote(req: Request, res: Response): Promise<Response> {
    try {
      const voteId: number = parseInt(req.params.voteId);
      const voteToDelete = await this.VoteRepository.findOne({
        relations: {
          user: true,
        },
        where: {
          id: voteId,
        },
      });
      if (!voteToDelete) {
        return res.status(404).json({
          code: 404,
          Error: "Vote ID not found",
        });
      }

      const deleteVote = await this.VoteRepository.createQueryBuilder("votes")
        .delete()
        .from(Votes)
        .where("id = :id", { id: voteToDelete.id })
        .execute();

      return res.status(200).json({
        code: 200,
        Data: voteToDelete,
        Message: `${voteToDelete.voter_name} berhasil dihapus dari database votes`,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        Error: "Error while deleting party data",
      });
    }
  }
})();
