import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GroupService } from "../services";
import { Group } from "../entities";
import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Resolver(of => Group)
export class GroupResolver {
  constructor(
    private groupService: GroupService,

    @Inject('RMQ_SERVICE')
    private mutationClient: ClientProxy
  ) {}

  @Query(returns => [Group])
  async getAllGroups() {
      return this.groupService.getAll()
  }

  @Query(returns => Group)
  async getGroup(@Args('id', {type: () => Int}) id: number) {
    return this.groupService.get(id)
  }

  @Mutation(returns => Boolean)
  async deleteGroup(@Args('id', {type: () => Int}) id: number) {
    await this.mutationClient.send({ cmd: 'group-remove' }, { id: id }).subscribe()

    return true
  }

  @Mutation(returns => Boolean)
  async createGroup(
    @Args('name', {type: () => String}) name: string,
    @Args('permissions', {type: () => String}) permissions: string
  ) {
    await this.mutationClient.send({ cmd: 'group-create' }, { model: { name: name, permissions: permissions } }).subscribe()

    return true
  }

  @Mutation(returns => Boolean)
  async updateGroup(
    @Args('id', {type: () => Int}) id: number,
    @Args('name', {type: () => String}) name: string,
    @Args('permissions', {type: () => String}) permissions: string
  ) {
    await this.mutationClient.send({ cmd: 'group-update' }, { id: id, model: { name: name, permissions: permissions } }).subscribe()

    return true
  }

  @Mutation(returns => Boolean)
  async addUser(
    @Args('id', {type: () => Int}) id: number,
    @Args('userId', {type: () => Int}) userId: number
  ) {
    await this.mutationClient.send({ cmd: 'group-add-user' }, { id: id, model: { userId: userId } }).subscribe()

    return true
  }

  @Mutation(returns => Boolean)
  async removeUser(
    @Args('id', {type: () => Int}) id: number,
    @Args('userId', {type: () => Int}) userId: number
  ) {
    await this.mutationClient.send({ cmd: 'group-remove-user' }, { id: id, model: { userId: userId } }).subscribe()

    return true
  }
}
