// <?php

// namespace App\Http\Controllers\Auth;

// use App\Http\Controllers\Controller;
// use Illuminate\Http\RedirectResponse;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Hash;
// use Illuminate\Validation\Rules\Password;

// class PasswordController extends Controller
// {
//     /**
//      * Update the user's password.
//      */
//     public function update(Request $request): RedirectResponse
//     {
//         $validated = $request->validate([
//             'current_password' => ['required', 'current_password'],
//             'password' => ['required', Password::defaults(), 'confirmed'],
//         ]);

//         $request->user()->update([
//             'password' => Hash::make($validated['password']),
//         ]);

//         return back();
//     }
// }

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ValidationException, rules, schema } from '@ioc:Adonis/Core/Validator'

export default class PasswordController {
  public async update({ request, auth, inertia }: HttpContextContract) {
    const validated = await request.validate({
      schema: schema.create({
        current_password: schema.string({}, [rules.required()]),
        password: schema.string({}, [rules.confirmed(), rules.required()]),
      }),
    })

    if (!(await auth.use('web').attempt(auth.user?.email || '', validated.current_password))) {
      throw new ValidationException(true, {
        current_password: ['Invalid credentials'],
      })
    }

    await auth
      .use('web')
      .user?.merge({
        password: validated.password,
      })
      .save()

    return inertia.redirectBack()
  }
}
