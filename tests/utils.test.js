//test configs
require('dotenv').config();
const ROLE_ID = process.env.ROLE_ID
const { assignRole, respondToMsg } = require('../utils/utils');

// Mock for the `member` object
const mockMember = (guildId) => {
  return {
    guild: {
      guildId: guildId,
      roles: {
        cache: {
          find: jest.fn().mockReturnValue({ id: ROLE_ID })  // Mock for`guild.roles.cache.find`
        }
      }
    },
    roles: {
      add: jest.fn()  // Mock for `member.roles.add`
    }
  };
};

// Test for `respondToMsg`
describe('respondToMsg', () => {
  let msg;

  beforeEach(() => {
    msg = {
      content: '',
      author: { username: 'dummyUser' },
      reply: jest.fn(),
    };
  });

  test('replies with help message when content is "!help"', () => {
    msg.content = '!help';
    respondToMsg(msg);
    expect(msg.reply).toHaveBeenCalledWith('Robots are designed to help you dummyUser');
  });

  test('replies with info message when content is "!info"', () => {
    msg.content = '!info';
    respondToMsg(msg);
    expect(msg.reply).toHaveBeenCalledWith("I'm a Discord bot created by Ignacio Dieguez, your orders are mine.");
  });

  test('does nothing for other messages', () => {
    msg.content = 'random message';
    respondToMsg(msg);
    expect(msg.reply).not.toHaveBeenCalled();
  });
});

// Test for `assignRole`
describe('assignRole function', () => {
  test('should assign role to member', () => {
    const member = mockMember('dummyGuildId');
    assignRole(member);
    expect(member.guild.roles.cache.find).toHaveBeenCalledWith(expect.any(Function));
    expect(member.roles.add).toHaveBeenCalledWith({ id: ROLE_ID }, 'Welcome to my server');
  });
});