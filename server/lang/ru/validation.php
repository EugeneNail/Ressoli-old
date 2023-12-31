<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => 'Значение должно быть принято.',
    'accepted_if' => 'Значение должно приниматься, если :other равно :value.',
    'active_url' => 'Значение должно быть действительным URL',
    'after' => 'Значение должно быть датой после :date.',
    'after_or_equal' => 'Значение должно быть датой после или равной :date.',
    'alpha' => 'Значение должно содержать только буквы',
    'alpha_dash' => 'Значение должно содержать только буквы, цифры, тире и символы подчеркивания',
    'alpha_num' => 'Значение должно содержать только буквы и цифры',
    'array' => 'Значение должно быть массивом',
    'ascii' => 'Значение должно содержать только однобайтовые алфавитно-цифровые символы и знаки.',
    'before' => 'Значение должно быть датой, предшествующей :date.',
    'before_or_equal' => 'Значение должно быть датой, предшествующей или равной :date.',
    'between' => [
        'array' => 'Значение должно иметь от :min до :max элементов',
        'file' => 'Значение должно иметь размер от :min до :max в килобайтах.',
        'numeric' => 'Значение должно быть между :min и :max.',
        'string' => 'Значение должно иметь от :min до :max символов',
    ],
    'boolean' => 'Значение должно быть true или false.',
    'can' => 'Поле содержит неавторизованное значение',
    'confirmed' => 'Подтверждение поля не совпадает.',
    'current_password' => 'Пароль неверен',
    'date' => 'Значение должно быть действительной датой',
    'date_equals' => 'Значение должно быть датой, равной :date.',
    'date_format' => 'Значение должно соответствовать формату :format.',
    'decimal' => 'Значение должно иметь :decimal десятичных знаков',
    'declined' => 'Значение должно быть отклонено.',
    'declined_if' => 'Значение должно быть отклонено, если :other равно :value.',
    'different' => 'Поле :attribute и :other должны быть разными.',
    'digits' => 'У поля должно быть :digits разрядов.',
    'digits_between' => 'Значение должно иметь от :min до :max разрядов.',
    'dimensions' => 'Значение имеет недопустимые размеры изображения.',
    'distinct' => 'Поле имеет дублирующее значение.',
    'doesnt_end_with' => 'Поле не должно заканчиваться одним из следующих значений: :values.',
    'doesnt_start_with' => 'Поле не должно начинаться с одного из следующих значений: :values.',
    'email' => 'Значение должно быть действительным адресом электронной почты',
    'ends_with' => 'Поле должно заканчиваться одним из следующих значений: :values.',
    'enum' => 'Выбранный атрибут недействителен.',
    'exists' => 'Выбранный атрибут недействителен.',
    'file' => 'Значение должно быть файлом',
    'filled' => 'Поле должно иметь значение',
    'gt' => [
        'array' => 'Значение должно иметь больше, чем :value элементов.',
        'file' => 'Значение должно быть больше, чем :value килобайт.',
        'numeric' => 'Значение должно быть больше, чем :value.',
        'string' => 'Значение должно быть длинее, чем :value символов.'
    ],
    'gte' => [
        'array' => 'Значение должно иметь :value элементов или более.',
        'file' => 'Значение должно быть больше или равно :value в килобайтах.',
        'numeric' => 'Значение должно быть больше или равно :value.',
        'string' => 'Значение должно быть длинее или равно :value символам.'
    ],
    'image' => 'Значение должно быть изображением',
    'in' => 'Выбранное значение недопустимо.',
    'in_array' => 'Значение должно существовать в :other.',
    'integer' => 'Значение должно быть целым числом.',
    'ip' => 'Значение должно быть действительным IP-адресом.',
    'ipv4' => 'Значение должно быть действительным IPv4-адресом',
    'ipv6' => 'Значение должно быть действительным IPv6-адресом.',
    'json' => 'Значение должно быть корректной строкой JSON.',
    'lowercase' => 'Значение должно быть в нижнем регистре',
    'lt' => [
        'array' => 'Значение должно иметь меньше :value элементов.',
        'file' => 'Значение должно быть меньше :value в килобайтах.',
        'numeric' => 'Значение должно быть меньше :value.',
        'string' => 'Значение должно быть короче :value символов.'
    ],
    'lte' => [
        'array' => 'Значение не должно иметь более чем :value элементов.',
        'file' => 'Значение должно быть меньше или равно :value в килобайтах.',
        'numeric' => 'Значение должно быть меньше или равно :value.',
        'string' => 'Значение должно быть короче или равно :value символам.'
    ],
    'mac_address' => 'Значение должно быть действительным MAC-адресом.',
    'max' => [
        'array' => 'Значение не должно иметь более :max элементов.',
        'file' => 'Значение не должно быть больше :max в килобайтах.',
        'numeric' => 'Значение не должно быть больше, чем :max.',
        'string' => 'Значение не должно быть длинее :max символов.',
    ],
    'max_digits' => 'Значение не должно содержать более :max разрядов.',
    'mimes' => 'Значение должно быть файлом типа: :values.',
    'mimetypes' => 'Значение должно быть файлом типа: :values.',
    'min' => [
        'array' => 'Значение должно содержать не менее :min элементов',
        'file' => 'Значение должно быть не менее :min в килобайтах.',
        'numeric' => 'Значение должно быть не менее :min.',
        'string' => 'Значение должно быть не короче :min символов.'
    ],
    'min_digits' => 'Значение должно содержать не менее :min разрядов',
    'missing' => 'Значение должно отсутствовать.',
    'missing_if' => 'Значение должно отсутствовать, если :other равно :value.',
    'missing_unless' => 'Значение должно отсутствовать, если :other не равно :value.',
    'missing_with' => 'Значение должно отсутствовать, если присутствует :values.',
    'missing_with_all' => 'Значение должно отсутствовать, если присутствуют :values.',
    'multiple_of' => 'Значение должно быть кратно :value.',
    'not_in' => 'Выбранное значение недействительно.',
    'not_regex' => 'Формат поля недопустим.',
    'numeric' => 'Значение должно быть числом.',
    'password' => [
        'letters' => 'Значение должно содержать хотя бы одну букву',
        'mixed' => 'Значение должно содержать как минимум одну заглавную и одну строчную букву',
        'numbers' => 'Значение должно содержать хотя бы одну цифру',
        'symbols' => 'Значение должно содержать хотя бы один символ',
        'uncompromised' => 'Данное значение оказалось в утечке данных. Пожалуйста, выберите другое значение.'
    ],
    'present' => 'Значение должно присутствовать',
    'prohibited' => 'Значение запрещено.',
    'prohibited_if' => 'Значение запрещено, если :other равно :value.',
    'prohibited_unless' => 'Значение запрещено, если :other не находится в :values.',
    'prohibits' => 'Значение запрещает присутствие :other.',
    'regex' => 'Формат значения недопустим.',
    'required' => 'Значение является обязательным.',
    'required_array_keys' => 'Значение должно содержать записи для: :values.',
    'required_if' => 'Значение обязательно, если :other равно :value.',
    'required_if_accepted' => 'Значение обязательно, если :other принято.',
    'required_unless' => 'Значение обязательно, если :other не находится в :values.',
    'required_with' => 'Значение обязательно для заполнения, если присутствует :values.',
    'required_with_all' => 'Значение обязательно для заполнения, если присутствуют :values.',
    'required_without' => 'Значение обязательно для заполнения, если :values не присутствует',
    'required_without_all' => 'Значение обязательно, если ни одно из :values не присутствует.',
    'same' => 'Значение должно совпадать с Значением :other.',
    'size' => [
        'array' => 'Значение должно содержать :size элементов.',
        'file' => 'Значение должно иметь размер :size в килобайтах.',
        'numeric' => 'Значение должно быть равно :size.',
        'string' => 'Значение должно содержать ровно :size символов.'
    ],
    'starts_with' => 'Значение должно начинаться с одного из следующих слов: :values.',
    'string' => 'Значение должно быть строкой.',
    'timezone' => 'Значение должно быть действительным часовым поясом.',
    'unique' => 'Значение уже занято',
    'uploaded' => 'Не удалось загрузить.',
    'uppercase' => 'Значение должно быть в верхнем регистре.',
    'url' => 'Значение должно быть правильным URL.',
    'ulid' => 'Значение должно быть правильным ULID.',
    'uuid' => 'Значение должно быть правильным UUID.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],

];
