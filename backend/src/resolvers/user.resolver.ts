import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "../services";
import { User } from "../entities";
import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Resolver(of => User)
export class UserResolver {
  constructor(
    private userService: UserService,

    @Inject('RMQ_SERVICE')
    private mutationClient: ClientProxy
  ) {}

  @Query(returns => [User])
  async getAllUsers() {
      return this.userService.getAll()
  }

  @Query(returns => User)
  async getUser(@Args('id', {type: () => Int}) id: number) {
    return this.userService.get(id)
  }

  @Mutation(returns => Boolean)
  async deleteUser(@Args('id', {type: () => Int}) id: number) {
    await this.mutationClient.send({ cmd: 'user-remove' }, { id: id }).subscribe()

    return true
  }

  @Mutation(returns => Boolean)
  async createUser(
    @Args('username', {type: () => String}) username: string
  ) {
    await this.mutationClient.send({ cmd: 'user-create' }, { model: { username: username } }).subscribe()

    return true
  }

  @Mutation(returns => Boolean)
  async updateUser(
    @Args('id', {type: () => Int}) id: number,
    @Args('username', {type: () => String}) username: string
  ) {
    await this.mutationClient.send({ cmd: 'user-update' }, { id: id, model: { username: username } }).subscribe()

    return true
  }

  @Mutation(returns => Boolean)
  async addFriend(
    @Args('id', {type: () => Int}) id: number,
    @Args('friendId', {type: () => Int}) friendId: number
  ) {
    await this.mutationClient.send({ cmd: 'user-add-friend' }, { id: id, model: { friendId: friendId } }).subscribe()

    return true
  }

  @Mutation(returns => Boolean)
  async removeFriend(
    @Args('id', {type: () => Int}) id: number,
    @Args('friendId', {type: () => Int}) friendId: number
  ) {
    await this.mutationClient.send({ cmd: 'user-remove-friend' }, { id: id, model: { friendId: friendId } }).subscribe()

    return true
  }
}
