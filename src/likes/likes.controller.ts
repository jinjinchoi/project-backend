import { Controller, Post, Param, Res, InternalServerErrorException, Headers, Get } from '@nestjs/common';
import { LikesService } from './likes.service';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("좋아요")
@Controller('board/:category')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  // 좋아요!!
  @Post(":id/LikeUpdate")
  @ApiOperation({summary: "좋아요"})
  @ApiResponse({status: 201, description: "좋아요 업데이트 성공"})
  async likeToggle(
    @Headers(`userToken`) userToken : string,
    @Param('category') category :string,
    @Param('id')id : string,
    @Res() res: Response,
  ) : Promise<Response> {
    const boardId = Number(id);
    const uid = userToken;
    try {
      const resultMessage : string = await this.likesService.updateLikeStatus(boardId, category, uid);
      return res.status(201).json({mesaage: resultMessage});
    } catch (err) {
      throw  new InternalServerErrorException(err.mesaage);
    }
  }

  // 좋아요 했는지
  @Get(':id/whetherLike')
  @ApiOperation({summary: "좋아요 했는지 확인"})
  @ApiResponse({status: 200, description: "좋아요 조회 성공"})
  async findUserLikeInfo(
    @Headers(`userToken`) userToken : string,
    @Param('id') boardId: string,
    @Param('category') category : string,
    @Res() res : Response,
  ) {
    const isLike : boolean = await this.likesService.WhetherLike(+boardId, category, userToken);
    return res.status(200).json({message : "조회 성공", isLike});
  }
}