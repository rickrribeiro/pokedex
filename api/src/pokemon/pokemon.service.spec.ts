import { Test, TestingModule } from '@nestjs/testing'
import { PokemonService } from './pokemon.service'
import { GeminiProvider } from './providers/gemini.provider'
import { pokemonSpecialistPrompt } from './prompts/pokemon-specialist.prompt'

jest.mock('pokedex-promise-v2', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    getPokemonsList: jest.fn(),
    getPokemonByName: jest.fn(),
  })),
}))

describe('PokemonService', () => {
  let service: PokemonService
  const mockGeminiProvider = {
    generateChatResponse: jest.fn(),
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        { provide: GeminiProvider, useValue: mockGeminiProvider },
      ],
    }).compile()

    service = module.get<PokemonService>(PokemonService)
  })

  describe('askPokeAI', () => {
    it('should call geminiProvider and return the response', async () => {
      mockGeminiProvider.generateChatResponse.mockResolvedValue(
        'Pikachu is an Electric-type pokemon.',
      )

      const chatHistory = [
        { role: 'user', content: 'Tell me about pikachu' },
        { role: 'assistant', content: 'What do you want to know?' },
      ]

      const result = await service.askPokeAI(
        'What type is it?',
        'pikachu',
        chatHistory,
      )

      expect(mockGeminiProvider.generateChatResponse).toHaveBeenCalledWith(
        pokemonSpecialistPrompt('pikachu'),
        [
          { role: 'user', parts: [{ text: 'Tell me about pikachu' }] },
          {
            role: 'assistant',
            parts: [{ text: 'What do you want to know?' }],
          },
        ],
        'What type is it?',
      )
      expect(result).toBe('Pikachu is an Electric-type pokemon.')
    })

    it('should return response with an empty chat history', async () => {
      mockGeminiProvider.generateChatResponse.mockResolvedValue(
        'Pikachu is an Electric-type pokemon.',
      )

      const result = await service.askPokeAI('What type is it?', 'pikachu', [])

      expect(mockGeminiProvider.generateChatResponse).toHaveBeenCalledWith(
        pokemonSpecialistPrompt('pikachu'),
        [],
        'What type is it?',
      )
      expect(result).toBe('Pikachu is an Electric-type pokemon.')
    })

    it('should throw the error when geminiProvider throws an error', async () => {
      mockGeminiProvider.generateChatResponse.mockRejectedValue(
        new Error('AI service unavailable'),
      )

      await expect(
        service.askPokeAI('question', 'pikachu', []),
      ).rejects.toThrow('AI service unavailable')
    })
  })
})
