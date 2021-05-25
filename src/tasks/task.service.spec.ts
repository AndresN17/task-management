import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn(),
});

const mockUser = {
  id: 1,
  username: 'Claire Kiernan Blunt',
};

describe('TaskService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('get all task from repository', async () => {
      taskRepository.getTasks.mockResolvedValue('some Value');

      expect(taskRepository.getTasks).not.toHaveBeenCalled();

      const filters: GetTaskFilterDto = {
        status: TaskStatus.IN_PROGRESS,
        search: 'Some search query',
      };
      const result = await tasksService.getTasks(filters, mockUser);
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('some Value');
    });
  });

  describe('get task by ID', () => {
    it('calls taskRepository.findOne() and retrieve and succesfully return the task', async () => {
      const mockTask = { title: 'Yuri Ha Jahad', description: 'IN_PROGRESS' };
      taskRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById(1, mockUser);
      expect(result).toEqual(mockTask);
      expect(taskRepository.findOne).toBeCalledWith({
        where: { id: 1, userId: mockUser.id },
      });
    });

    it('throws an error as task is not found.', () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create task', () => {
    it('created a task succesfully', async () => {
      taskRepository.createTask.mockResolvedValue({
        title: 'Yuri Ha Jahad',
        description: 'Strong Princess',
      });
      expect(taskRepository.createTask).not.toHaveBeenCalled();
      const taskDto: CreateTaskDto = {
        title: 'Yuri Ha Jahad',
        description: 'Strong Princess',
      };
      const task = await tasksService.createTask(taskDto, mockUser);
      expect(taskRepository.createTask).toHaveBeenCalledWith(taskDto, mockUser);
      expect(task).toEqual({
        title: 'Yuri Ha Jahad',
        description: 'Strong Princess',
      });
    });
    it('throw an error if task was not created', () => {
      taskRepository.createTask.mockResolvedValue(null);
      const taskDto: CreateTaskDto = {
        title: 'Yuri Ha Jahad',
        description: 'Strong Princess',
      };
      expect(taskRepository.createTask(taskDto, mockUser)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('deleteTask', () => {
    it('delete a task succesfully', async () => {
      taskRepository.delete.mockResolvedValue({ affected: 1 });
      expect(taskRepository.delete).not.toHaveBeenCalled();
      await tasksService.deleteTask(1, mockUser);
      expect(taskRepository.delete).toHaveBeenCalledWith({
        id: 1,
        userId: mockUser.id,
      });
    });

    it('throws error because the task does not exist', async () => {
      taskRepository.delete.mockResolvedValue({ affected: 0 });
      expect(tasksService.deleteTask(1, mockUser)).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe('updateTaskStatus', () => {
    it('update task status', async () => {
      const save = jest.fn().mockResolvedValue(true);
      tasksService.getTaskById = jest.fn().mockResolvedValue({
        status: TaskStatus.OPEN,
        save,
      });

      expect(tasksService.getTaskById).not.toHaveBeenCalled();

      const result = await tasksService.updateTaskStatus(
        1,
        TaskStatus.DONE,
        mockUser,
      );
      expect(tasksService.getTaskById).toHaveBeenCalled();
      expect(save).toHaveBeenCalled();
      expect(result.status).toEqual(TaskStatus.DONE);
    });
  });
});
