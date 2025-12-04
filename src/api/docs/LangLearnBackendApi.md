# LangLearnBackendApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authGet**](#authget) | **GET** /auth | |
|[**authLoginPost**](#authloginpost) | **POST** /auth/login | |
|[**authRefreshPost**](#authrefreshpost) | **POST** /auth/refresh | |
|[**authRegisterPost**](#authregisterpost) | **POST** /auth/register | |
|[**decksDeckIdFlashcardsFlashcardIdDelete**](#decksdeckidflashcardsflashcardiddelete) | **DELETE** /decks/{deckId}/flashcards/{flashcardId} | |
|[**decksDeckIdFlashcardsFlashcardIdGet**](#decksdeckidflashcardsflashcardidget) | **GET** /decks/{deckId}/flashcards/{flashcardId} | |
|[**decksDeckIdFlashcardsFlashcardIdPatch**](#decksdeckidflashcardsflashcardidpatch) | **PATCH** /decks/{deckId}/flashcards/{flashcardId} | |
|[**decksDeckIdFlashcardsGet**](#decksdeckidflashcardsget) | **GET** /decks/{deckId}/flashcards | |
|[**decksDeckIdFlashcardsPost**](#decksdeckidflashcardspost) | **POST** /decks/{deckId}/flashcards | |
|[**decksGet**](#decksget) | **GET** /decks | |
|[**decksIdDelete**](#decksiddelete) | **DELETE** /decks/{id} | |
|[**decksIdGet**](#decksidget) | **GET** /decks/{id} | |
|[**decksIdPatch**](#decksidpatch) | **PATCH** /decks/{id} | |
|[**decksPost**](#deckspost) | **POST** /decks | |
|[**grammarsetsGet**](#grammarsetsget) | **GET** /grammarsets | |
|[**grammarsetsIdDelete**](#grammarsetsiddelete) | **DELETE** /grammarsets/{id} | |
|[**grammarsetsIdGet**](#grammarsetsidget) | **GET** /grammarsets/{id} | |
|[**grammarsetsIdPatch**](#grammarsetsidpatch) | **PATCH** /grammarsets/{id} | |
|[**grammarsetsPost**](#grammarsetspost) | **POST** /grammarsets | |
|[**grammarsetsSetIdGrammarsGet**](#grammarsetssetidgrammarsget) | **GET** /grammarsets/{setId}/grammars | |
|[**grammarsetsSetIdGrammarsGrammarIdDelete**](#grammarsetssetidgrammarsgrammariddelete) | **DELETE** /grammarsets/{setId}/grammars/{grammarId} | |
|[**grammarsetsSetIdGrammarsGrammarIdGet**](#grammarsetssetidgrammarsgrammaridget) | **GET** /grammarsets/{setId}/grammars/{grammarId} | |
|[**grammarsetsSetIdGrammarsGrammarIdPatch**](#grammarsetssetidgrammarsgrammaridpatch) | **PATCH** /grammarsets/{setId}/grammars/{grammarId} | |
|[**grammarsetsSetIdGrammarsPost**](#grammarsetssetidgrammarspost) | **POST** /grammarsets/{setId}/grammars | |

# **authGet**
> AuthResultDto authGet()


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

const { status, data } = await apiInstance.authGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**AuthResultDto**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authLoginPost**
> AuthResultDto authLoginPost(loginRequestDto)


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration,
    LoginRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

let loginRequestDto: LoginRequestDto; //

const { status, data } = await apiInstance.authLoginPost(
    loginRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loginRequestDto** | **LoginRequestDto**|  | |


### Return type

**AuthResultDto**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authRefreshPost**
> AuthResultDto authRefreshPost(refreshTokenRequestDto)


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration,
    RefreshTokenRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

let refreshTokenRequestDto: RefreshTokenRequestDto; //

const { status, data } = await apiInstance.authRefreshPost(
    refreshTokenRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **refreshTokenRequestDto** | **RefreshTokenRequestDto**|  | |


### Return type

**AuthResultDto**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authRegisterPost**
> AuthResultDto authRegisterPost(registerRequestDto)


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration,
    RegisterRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

let registerRequestDto: RegisterRequestDto; //

const { status, data } = await apiInstance.authRegisterPost(
    registerRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **registerRequestDto** | **RegisterRequestDto**|  | |


### Return type

**AuthResultDto**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **decksDeckIdFlashcardsFlashcardIdDelete**
> decksDeckIdFlashcardsFlashcardIdDelete()


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

let deckId: string; // (default to undefined)
let flashcardId: string; // (default to undefined)

const { status, data } = await apiInstance.decksDeckIdFlashcardsFlashcardIdDelete(
    deckId,
    flashcardId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **deckId** | [**string**] |  | defaults to undefined|
| **flashcardId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | No Content |  -  |
|**404** | Not Found |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **decksDeckIdFlashcardsFlashcardIdGet**
> FlashcardDto decksDeckIdFlashcardsFlashcardIdGet()


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

let deckId: string; // (default to undefined)
let flashcardId: string; // (default to undefined)

const { status, data } = await apiInstance.decksDeckIdFlashcardsFlashcardIdGet(
    deckId,
    flashcardId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **deckId** | [**string**] |  | defaults to undefined|
| **flashcardId** | [**string**] |  | defaults to undefined|


### Return type

**FlashcardDto**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **decksDeckIdFlashcardsFlashcardIdPatch**
> FlashcardDto decksDeckIdFlashcardsFlashcardIdPatch(flashcard)


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration,
    Flashcard
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

let deckId: string; // (default to undefined)
let flashcardId: string; // (default to undefined)
let flashcard: Flashcard; //

const { status, data } = await apiInstance.decksDeckIdFlashcardsFlashcardIdPatch(
    deckId,
    flashcardId,
    flashcard
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **flashcard** | **Flashcard**|  | |
| **deckId** | [**string**] |  | defaults to undefined|
| **flashcardId** | [**string**] |  | defaults to undefined|


### Return type

**FlashcardDto**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **decksDeckIdFlashcardsGet**
> Array<FlashcardDto> decksDeckIdFlashcardsGet()


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

let deckId: string; // (default to undefined)

const { status, data } = await apiInstance.decksDeckIdFlashcardsGet(
    deckId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **deckId** | [**string**] |  | defaults to undefined|


### Return type

**Array<FlashcardDto>**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **decksDeckIdFlashcardsPost**
> FlashcardDto decksDeckIdFlashcardsPost(flashcard)


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration,
    Flashcard
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

let deckId: string; // (default to undefined)
let flashcard: Flashcard; //

const { status, data } = await apiInstance.decksDeckIdFlashcardsPost(
    deckId,
    flashcard
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **flashcard** | **Flashcard**|  | |
| **deckId** | [**string**] |  | defaults to undefined|


### Return type

**FlashcardDto**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**404** | Not Found |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **decksGet**
> Array<DeckDto> decksGet()


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

const { status, data } = await apiInstance.decksGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<DeckDto>**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **decksIdDelete**
> decksIdDelete()


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.decksIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | No Content |  -  |
|**404** | Not Found |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **decksIdGet**
> DeckDto decksIdGet()


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.decksIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**DeckDto**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **decksIdPatch**
> DeckDto decksIdPatch(deck)


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration,
    Deck
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

let id: string; // (default to undefined)
let deck: Deck; //

const { status, data } = await apiInstance.decksIdPatch(
    id,
    deck
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **deck** | **Deck**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**DeckDto**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **decksPost**
> DeckDto decksPost(deck)


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration,
    Deck
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

let deck: Deck; //

const { status, data } = await apiInstance.decksPost(
    deck
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **deck** | **Deck**|  | |


### Return type

**DeckDto**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **grammarsetsGet**
> Array<GrammarSetDto> grammarsetsGet()


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

const { status, data } = await apiInstance.grammarsetsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<GrammarSetDto>**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **grammarsetsIdDelete**
> grammarsetsIdDelete()


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.grammarsetsIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | No Content |  -  |
|**404** | Not Found |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **grammarsetsIdGet**
> GrammarSetDto grammarsetsIdGet()


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.grammarsetsIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GrammarSetDto**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **grammarsetsIdPatch**
> GrammarSetDto grammarsetsIdPatch(grammarSet)


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration,
    GrammarSet
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

let id: string; // (default to undefined)
let grammarSet: GrammarSet; //

const { status, data } = await apiInstance.grammarsetsIdPatch(
    id,
    grammarSet
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **grammarSet** | **GrammarSet**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GrammarSetDto**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **grammarsetsPost**
> GrammarSetDto grammarsetsPost(grammarSet)


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration,
    GrammarSet
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

let grammarSet: GrammarSet; //

const { status, data } = await apiInstance.grammarsetsPost(
    grammarSet
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **grammarSet** | **GrammarSet**|  | |


### Return type

**GrammarSetDto**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **grammarsetsSetIdGrammarsGet**
> Array<GrammarDto> grammarsetsSetIdGrammarsGet()


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

let setId: string; // (default to undefined)

const { status, data } = await apiInstance.grammarsetsSetIdGrammarsGet(
    setId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **setId** | [**string**] |  | defaults to undefined|


### Return type

**Array<GrammarDto>**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **grammarsetsSetIdGrammarsGrammarIdDelete**
> grammarsetsSetIdGrammarsGrammarIdDelete()


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

let setId: string; // (default to undefined)
let grammarId: string; // (default to undefined)

const { status, data } = await apiInstance.grammarsetsSetIdGrammarsGrammarIdDelete(
    setId,
    grammarId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **setId** | [**string**] |  | defaults to undefined|
| **grammarId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | No Content |  -  |
|**404** | Not Found |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **grammarsetsSetIdGrammarsGrammarIdGet**
> GrammarDto grammarsetsSetIdGrammarsGrammarIdGet()


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

let setId: string; // (default to undefined)
let grammarId: string; // (default to undefined)

const { status, data } = await apiInstance.grammarsetsSetIdGrammarsGrammarIdGet(
    setId,
    grammarId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **setId** | [**string**] |  | defaults to undefined|
| **grammarId** | [**string**] |  | defaults to undefined|


### Return type

**GrammarDto**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **grammarsetsSetIdGrammarsGrammarIdPatch**
> GrammarDto grammarsetsSetIdGrammarsGrammarIdPatch(grammar)


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration,
    Grammar
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

let setId: string; // (default to undefined)
let grammarId: string; // (default to undefined)
let grammar: Grammar; //

const { status, data } = await apiInstance.grammarsetsSetIdGrammarsGrammarIdPatch(
    setId,
    grammarId,
    grammar
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **grammar** | **Grammar**|  | |
| **setId** | [**string**] |  | defaults to undefined|
| **grammarId** | [**string**] |  | defaults to undefined|


### Return type

**GrammarDto**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**404** | Not Found |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **grammarsetsSetIdGrammarsPost**
> GrammarDto grammarsetsSetIdGrammarsPost(grammar)


### Example

```typescript
import {
    LangLearnBackendApi,
    Configuration,
    Grammar
} from './api';

const configuration = new Configuration();
const apiInstance = new LangLearnBackendApi(configuration);

let setId: string; // (default to undefined)
let grammar: Grammar; //

const { status, data } = await apiInstance.grammarsetsSetIdGrammarsPost(
    setId,
    grammar
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **grammar** | **Grammar**|  | |
| **setId** | [**string**] |  | defaults to undefined|


### Return type

**GrammarDto**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**404** | Not Found |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

